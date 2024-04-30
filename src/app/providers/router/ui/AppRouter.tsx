import { memo, Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import {
  AppRoutesProps,
  routeConfig,
} from "shared/config/routeConfig/routeConfig";
import cls from "./AppRouter.module.scss";
import { InfinitySpin } from "react-loader-spinner";

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense
        fallback={
          <div className={cls.spinnerContainer}>
            <InfinitySpin width="150" color="var(--primary-color)" />
          </div>
        }
      >
        <SwitchTransition>
          <CSSTransition
            key={route.path}
            timeout={100}
            classNames={{
              enter: cls.inputSessionEnter,
              enterActive: cls.inputSessionEnterActive,
              exit: cls.inputSessionExit,
              exitActive: cls.inputSessionExitActive,
            }}
          >
            {route.element}
          </CSSTransition>
        </SwitchTransition>
      </Suspense>
    );
    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return (
    <Routes>
      {Object.values(routeConfig).map((route) => renderWithWrapper(route))}
    </Routes>
  );
};

export default memo(AppRouter);
