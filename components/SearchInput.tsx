import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

type Props = {
    placeholder?: string,
}

export function SearchInput({ placeholder = "Search..." }: Props) {
    return (
        <div className="border rounded-lg flex justify-between items-center">
            <Input 
                type="text"
                placeholder={ placeholder || "Search" }
                className="border-none"
            />
            <Button variant="ghost" size="icon">
                <Search />
                <span className="sr-only">Search Button</span>
            </Button>   
        </div>
    )
}
