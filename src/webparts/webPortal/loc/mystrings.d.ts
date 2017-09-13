declare interface IWebPortalStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'webPortalStrings' {
  const strings: IWebPortalStrings;
  export = strings;
}
