// import type { Core } from '@strapi/strapi';

import { Core } from "@strapi/strapi";
import setupGlobalLifecycleHooks from "./utils/global-lifecycle-hooks";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.log.info("Setting up global lifecycle hooks for cache invalidation...");
    setupGlobalLifecycleHooks();
  },
};
