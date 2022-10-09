import { lazy } from "react";

export const lazyLoad = (moduleName: string) => {
    const Module = lazy(() => import(`@/pages${moduleName}`));
    return <Module />;
};
