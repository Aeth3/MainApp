import LogoutButton from "../../../components/ui/LogoutButton";
import { useGlobal } from "../../../context/context";
import { useAuth } from "../../../src/presentation/hooks/useAuth";

export default function Logout({ config }) {
    const { logout } = useAuth()
    const { setCurrentPage } = useGlobal()

    const handleLogout = async () => {
        await logout()
        setCurrentPage(0)
    }
    return <LogoutButton onLogout={handleLogout} />
}