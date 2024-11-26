import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";

import {
  Dashboard as DashboardView,
  Wallet as WalletView,
  Savings as SavingsView,
  Investments as InvestmentsView,
  RealEstate as RealEstateView,
  Gold as GoldView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  PortfolioSelect as PortfolioSelectView,
  AssetAllocator as AssetAllocatorView
} from "./views";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/sign-in" />
      <RouteWithLayout
        component={PortfolioSelectView}
        exact
        layout={MinimalLayout}
        path="/select-portfolio"
      />
      <RouteWithLayout
        component={AssetAllocatorView}
        exact
        layout={MinimalLayout}
        path="/allocate-assets"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={SavingsView}
        exact
        layout={MainLayout}
        path="/savings"
      />
      <RouteWithLayout
        component={WalletView}
        exact
        layout={MainLayout}
        path="/wallet"
      />
      <RouteWithLayout
        component={InvestmentsView}
        exact
        layout={MainLayout}
        path="/investments"
      />
      <RouteWithLayout
        component={RealEstateView}
        exact
        layout={MainLayout}
        path="/real-estate"
      />
      <RouteWithLayout
        component={GoldView}
        exact
        layout={MainLayout}
        path="/gold"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
