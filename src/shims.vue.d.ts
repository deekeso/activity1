import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title: string;
  }
}

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
