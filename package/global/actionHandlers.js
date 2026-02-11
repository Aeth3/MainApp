import { useGlobal } from "../context/context";

export const useActionHandlers = (customHandlers = {}) => {
    const { setCurrentPage } = useGlobal();

    // Default handlers for known pages
    const defaultPageHandlers = {
        home: () => setCurrentPage(0),
        videos: () => setCurrentPage(1),
        friends: () => setCurrentPage(2),
        profile: () => setCurrentPage(3),
        notification: () => setCurrentPage(4),
        menu: () => setCurrentPage(5),
    };

    // Generic default handler for unknown actions
    const genericHandler = (action, item) =>
        console.log(`Action "${action}" triggered for item:`, item);

    // Return a Proxy that dynamically resolves handlers
    return new Proxy({}, {
        get(_, action) {

            // 1. Use a custom handler if provided
            if (customHandlers[action]) return customHandlers[action];

            // 2. Use a default page handler if defined
            if (defaultPageHandlers[action]) return (item) => defaultPageHandlers[action](item);

            // 3. Fallback generic handler
            return (item) => genericHandler(action, item);
        },
    });
};
