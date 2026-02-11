import CollapsibleList from "../../../components/ui/CollapsibleList";

export default function Settings({ config }) {
    return <CollapsibleList items={config.settingsItems}  />
}