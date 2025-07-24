import { render } from "@testing-library/react";
import { ReactFlowProvider } from "@xyflow/react";
import {PageNode} from "@/components/flow/PageNode";

describe("PageNode Component", () => {
  it("renders label and level", () => {
    render(
      <ReactFlowProvider>
        <PageNode
         
          data={{ id: "1", label: "Test Label", level: 1 }}
          isConnectable={true}
        
          
        />
      </ReactFlowProvider>
    );
  });
});
