declare module "@strapi/design-system/*";
declare module "@strapi/design-system";
declare module "@strapi/icons";
declare module "@strapi/icons/*";
declare module "@strapi/helper-plugin";

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
