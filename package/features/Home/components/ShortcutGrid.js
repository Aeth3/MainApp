import { iconMap } from "../../../assets/icons/iconMap";
import MasonryGrid from "../../../components/ui/MasonryGrid";
import { useActionHandlers } from "../../../global/actionHandlers";

export default function ShortcutGrid({ config }) {
    const actionHandlers = useActionHandlers({
        memories: (item) => console.log("item", item)
    })
    return <MasonryGrid items={config.gridItems} iconMap={iconMap} onPress={(item) => actionHandlers[item.action]?.(item)} />
}