// import Header, { HeaderLeft } from '@/components/layout/Header';
// import Breadcrumb from '@/components/layout/Breadcrumb';
// import pages from '@/Routes/pages';
// import Icon from '@/components/icon/Icon';
// import Container from '@/components/layout/Container';
// import Card, {
// 	CardBody,
// 	CardHeader,
// 	CardHeaderChild,
// 	CardSubTitle,
// 	CardTitle,
// } from '@/components/ui/Card';
// import MdViewer from '@/components/utils/MdViewer';
// import extractSnippetUtil from '@/utils/extractSnippet.util';
// import asideSource from '@/components/layout/Aside.tsx?raw'; // eslint-disable-line import/extensions
// import usageMD from './usage.md';
// import usage2MD from './usage2.md';

export const HeaderPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl text-white">Layout General</div>

      <div className="overflow-auto">
		{/* inicio modelo */}
        <div className="flex flex-col gap-4 w-full min-w-135 text-white">

          <div className="flex gap-4">
            <div className="flex h-150 w-60 min-w-50 flex-col gap-2 rounded-2xl border-dashed border-2 border-zinc-500/50 p-2">
              Sidebar
              <div className="flex items-center justify-between rounded-xl border-2 border-dashed border-amber-500/50 p-2">
                Sidebar Head
              </div>
              <div className="no-scrollbar flex h-full flex-col gap-2  rounded-xl border-2 border-dashed border-amber-500/50 p-2">
                Sidebar Body
                <div className="flex flex-col gap-2 rounded-lg border-2 border-dashed border-emerald-500/50 p-2">
                  Nav
                  <div className="rounded-md border-2 border-dashed border-blue-500/50 p-2">
                    NavTitle
                  </div>
                  <div className="rounded-md border-2 border-dashed border-blue-500/50 p-2">
                    NavItem
                  </div>
                  <div className="rounded-md border-2 border-dashed border-blue-500/50 p-2">
                    NavCollapse
                  </div>
                </div>
              </div>
              							<div className='rounded-xl border-2 border-dashed border-amber-500/50 p-2'>
								AsideFooter
							</div>
            </div>
            <div className="flex h-150 w-full flex-col gap-2 rounded-2xl border-2 border-dashed border-zinc-500/50 p-2">
              Main
              <div className="flex flex-col rounded-xl animate-pulse border-2 border-dashed border-amber-500/50 p-2">
                <div>Header</div>
                <div className="flex justify-between gap-4">
                  <div className="flex items-center justify-between rounded-lg border-2 border-dashed border-emerald-500/50 p-2">
                    HeaderLeft
                  </div>
                  <div className="flex items-center justify-between rounded-lg border-2 border-dashed border-emerald-500/50 p-2">
                    HeaderRight
                  </div>
                </div>
              </div>
              <div className="flex h-full flex-col rounded-xl border-2 border-dashed border-amber-500/50 p-2">
                <div>Outlet</div>
              </div>
              <div className="rounded-xl border-2 border-dashed border-amber-500/50 p-2">
                Footer - Desktop
              </div>
            </div>
          </div>
          <div className="flex w-full rounded-2xl py-3 border-2 border-dashed border-zinc-500/50 p-2">
            Footer - Mobile
          </div>
        </div>
		{/* fin modelo */}
      </div>

      {/* <Card>
						<CardHeader>
							<CardHeaderChild>
								<CardSubTitle>{`// src/Routes/index.tsx`}</CardSubTitle>
							</CardHeaderChild>
						</CardHeader>
						<CardBody>
							<MdViewer mdFile={usageMD} />
						</CardBody>
					</Card>
					<Card>
						<CardHeader>
							<CardHeaderChild>
								<CardSubTitle>{`// src/layouts/Default.layout.tsx`}</CardSubTitle>
							</CardHeaderChild>
						</CardHeader>
						<CardBody>
							<MdViewer mdFile={usage2MD} />
						</CardBody>
					</Card>

					<Card>
						<CardHeader>
							<CardHeaderChild>
								<CardTitle>API</CardTitle>
							</CardHeaderChild>
						</CardHeader>
						<CardBody>
							<MdViewer code={extractSnippetUtil(asideSource, 'interface')} />
						</CardBody>
					</Card> */}
    </div>
  );
};
