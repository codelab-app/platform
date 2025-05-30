import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './Resizable'

export default {
  component: ResizablePanelGroup,
  title: 'Atoms/Resizable',
}

export const Default = {
  args: {},
  render: () => (
    <ResizablePanelGroup
      className="max-w-md rounded-lg border md:min-w-[450px]"
      direction="horizontal"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
