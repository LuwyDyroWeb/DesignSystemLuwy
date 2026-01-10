# Cambios Zustand **(auth.store.tsx)**

## 1. Contexto

#### ====== Antes (*Auth = parte del render*)

El estado vive dentro de un componente React "**AuthProvider.tsx**"

```bash
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokenStorage, setTokenStorage] = useState<string | null>(null);
  const [usernameStorage, setUsernameStorage] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
```
Se necesitaba:

- useState
- useEffect para Restaurar sesión(Cuando React monte el componente, entonces la sesion se restaura”)
```
useEffect(() => {
    restoreSession();
}, []);
```
- useMemo para evitar re-renders, guarda el valor de la función.(caché)
- useCallback para evitar re-renders, guarda la función misma.(caché)


#### ====== Despues (*Auth = servicio global*)

El estado ya no vive en un componente, vive en un store independiente. El store no se monta, no se desmonta, no depende del render.(**auth.store.tsx**)
```bash
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      _hasHydrated: false,
      ...
    })
  )
);
```
Restaurar sesión(El estado existe siempre, React solo lo consulta)


## 2. Arquitectura

#### ====== Antes(Provider)

```bash
<AuthProvider>
  <App />
</AuthProvider>
```
React Context no sabe qué parte del objeto se usa, solo sabe que el value cambió
Por eso se tenia que: Memorizar funciones, Memorizar el objeto.

```bash
const value = useMemo(
  () => ({
    isInitializing,
    onLogin,
    onLoginWithGoogle,
    usernameStorage,
    tokenStorage,
    onLogout,
  }),
  [...]
);
```
POR EJEMPLO:

```bash
<AuthProvider> 
  ├─ Navbar //llama a user
  ├─ Header // llama a token
  ├─ Footer // llama a user
```

Si cambia token:

TODOS los componentes que usan useAuth() se re-renderizan aunque solo uno necesite el token.

#### ====== Despues(Sin Provider)

No hay Provider. Cada componente se suscribe solo al fragmento que necesita. Zustand compara: Valor anterior y Valor nuevo. Si no cambia → no hay render

POR EJEMPLO:

En <Navbar>
```bash
const user = useAuthStore((s) => s.user);
```
En <Header>
```bash
const token = useAuthStore((s) => s.token);
```
Ambos usan useAuthStore, pero si cambia el token, entonces solo **Header** se re-renderiza, **Navbar** ya no.


## 3. Limpieza de codigo

#### ====== Antes()

- Logout-Manual: Dependiente de React Router(navigate). El store de auth no debería saber a donde se navegas. No debería conocer react-router-dom. Poco Escalable
```bash
const onLogout = useCallback(
  async (isNavigate = true) => {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("accessToken");

    setTokenStorage(null);
    setUsernameStorage(null);

    if (isNavigate) navigate(`./`, { replace: true });
  },
  [navigate]
);
```

#### ====== Despues()

- Logout-Automatico:
```bash
      logout: () => {
        set({ user: null, token: null });
        useAuthStore.persist.clearStorage();
      },
```
- El store ya no sabe nada de navegación. El store solo maneja estado. El componente decide qué hacer después


- Persistencia y estado sincronizados(*persist()*). El estado en memoria, El estado persistido, quedan siempre alineados.
```bash
  export const useAuthStore = create<AuthState>()(
    persist(
    ...

      set({ user: null, token: null });
      ...
      clearStorage();
```

