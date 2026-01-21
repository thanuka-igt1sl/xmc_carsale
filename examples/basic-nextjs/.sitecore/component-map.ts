// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as TwoColumnSplitter from 'src/components/demo/TwoColumnSplitter';
import * as ImageList from 'src/components/demo/ImageList';
import * as HomePageLinks from 'src/components/demo/HomePageLinks';
import * as Heading from 'src/components/demo/Heading';
import * as Cryptocurrencies from 'src/components/demo/Cryptocurrencies';
import * as ColumnSplitter from 'src/components/demo/ColumnSplitter';
import * as Carousel from 'src/components/demo/Carousel';
import * as Button from 'src/components/demo/Button';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', Form],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['TwoColumnSplitter', { ...TwoColumnSplitter }],
  ['ImageList', { ...ImageList }],
  ['HomePageLinks', { ...HomePageLinks }],
  ['Heading', { ...Heading }],
  ['Cryptocurrencies', { ...Cryptocurrencies }],
  ['ColumnSplitter', { ...ColumnSplitter }],
  ['Carousel', { ...Carousel, componentType: 'client' }],
  ['Button', { ...Button }],
]);

export default componentMap;
