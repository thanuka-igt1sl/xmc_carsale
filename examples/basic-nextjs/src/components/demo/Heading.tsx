import React from 'react';
import { Field, RichText,} from '@sitecore-content-sdk/nextjs';
interface Fields {
  headline: Field<string>;
  description: Field<string>;
  headlineStyle: Field<string>;
}
type HeadingProps = {
  params: { [key: string]: string };
  fields: Fields;
};
export const Default = (props: HeadingProps): React.ReactElement => {
  const containerStyles = props.params && props.params.styles ? props.params.styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  const h2Style = props.fields?.headlineStyle?.value || '';
  return (
    <div className={`container-default component ${styles}`}>
     
      <h2 className={`component-content title row ${h2Style}`}>
        <RichText field={props.fields.headline} />
      </h2>
      <div className="component-content text row">
        <RichText field={props.fields.description} />
      </div>
    </div>
  );
};
