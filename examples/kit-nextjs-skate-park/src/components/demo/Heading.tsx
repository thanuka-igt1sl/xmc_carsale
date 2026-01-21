import React from 'react';
import { Field, Text } from '@sitecore-content-sdk/nextjs';
interface Fields {
  headline: Field<string>;
  description: Field<string>;
}
type HeadingProps = {
  params: { [key: string]: string };
  fields: Fields;
};
export const Default = (props: HeadingProps): React.ReactElement => {
  const containerStyles = props.params && props.params.styles ? props.params.styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  return (
    <div className={`container-default component ${styles}`}>
      <div data-class-change className={containerStyles}>
        This container must be refreshed without reloading the page.
      </div>
      <h1 className="component-content title row">
        <Text field={props.fields.headline} />
      </h1>
      <div className="component-content text row">
        <Text field={props.fields.description} />
      </div>
    </div>
  );
};
