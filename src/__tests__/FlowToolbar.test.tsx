import { render, screen, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom'
import { FlowToolbar } from "../components/flow/FlowToolbar"

describe("FlowToolbar Component", () => {
    const mockHandlers = {
        onSave: jest.fn(),
        onLoad: jest.fn(),
        onExport: jest.fn(),
        onViewJson: jest.fn(),
    }

    beforeEach(() => {
       
        const mockHierarchyData = {} as any

        render(
            <FlowToolbar
                onSave={mockHandlers.onSave}
                onLoad={mockHandlers.onLoad}
                onExport={mockHandlers.onExport}
                onViewJson={mockHandlers.onViewJson}
                hierarchyData={mockHierarchyData}
            />
        )
    })

    it("renders all toolbar buttons", () => {
        expect(screen.getByText("Save")).toBeInTheDocument()
        expect(screen.getByText("Load")).toBeInTheDocument()
        expect(screen.getByText("Export")).toBeInTheDocument()
        // expect(screen.getByText("View JSON")).toBeInTheDocument()
    })

    it("calls correct handler on button click", () => {
        fireEvent.click(screen.getByText("Save"))
        expect(mockHandlers.onSave).toHaveBeenCalled()

        fireEvent.click(screen.getByText("Load"))
        expect(mockHandlers.onLoad).toHaveBeenCalled()

        fireEvent.click(screen.getByText("Export"))
        expect(mockHandlers.onExport).toHaveBeenCalled()

        // fireEvent.click(screen.getByText("View JSON"))
        // expect(mockHandlers.onViewJson).toHaveBeenCalled()
    })
})
