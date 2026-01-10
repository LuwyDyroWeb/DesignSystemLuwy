## Zustand y TanStack Query

### Para que sirven?

#### ====== Zustand

Estado global de UI y lógica de negocio (auth, theme, flags, cuentas)

- Auth (usuario, token, sesión)
- Flags de UI (modals, notifications)
- Carrito de compras
- Estados derivados que no vienen de API directa

Lo que tenemos ahora:

```bash
const user = useAuthStore((s) => s.user);
const token = useAuthStore((s) => s.token);
```

#### ====== TanStack Query

Datos asíncronos (fetch), caché, re-fetching, sincronización con servidor

- Fetch de datos de APIs
- Cache automática de esos datos
- Revalidación inteligente (focus/tab/window)
- Retries automáticos
- Stale / Fresh control
- Suspense / prefetch / pagination / infinite scroll

#### Comparación:

| Característica             | TanStack Query    | Zustand                   |
| -------------------------- | ----------------- | ------------------------- |
| Cache de fetch             | Excelente         | No tiene                  |
| Estado global              | no es su foco     | Excelente (Ya lo tenemos) |
| Refetch automático         | Sí (configurable) | No tiene                  |
| Persistencia               | Con middleware    | Bueno (Ya lo tenemos)     |
| Server state               | Sí tiene          | No tan bueno               |
| UI state                   | Limitado          | Excelente                 |
| Integración con async data | Nativo            | Manual                    |

## Utilidad:

- **Para la duración de sesión o logout por inactividad** se hace por estado de sesión/tiempo -> TanStack Query cachea la data por un tiempo, pero no es ideal para lógica de sesión/timeout. Para eso necesitamos **Zustand**.

- **Control de Caché** TanStack Query

    *Para la sesión*
    - Para mantener datos de perfil en caché
    - Para refrescar tokens automáticamente
    - Para invalidar datos al momento de hacer el logout(limpiar cache)
    *General*
    - Listas / CRUD de APIs
    - Cache con stale times
    - Datos que cambian frequentemente


## Resumen
**Zustand** para Auth/Control de sesión y Estado global

**TanStack Query** para Cache/Server state