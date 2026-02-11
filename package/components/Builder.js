import { iconMap } from "../assets/icons/iconMap"
import DynamicRenderer from "./DynamicRenderer"
import Screen from "./layout/Screen"
export default function Builder({ components = [], config, props }) {
    return components.map((comp, i) =>
        <DynamicRenderer key={i} item={comp} config={config} actionHandlers={comp?.actionHandlers} iconMap={iconMap} secondaryIconsMap={comp?.secondaryIconsMap} props={props} />
    )
}