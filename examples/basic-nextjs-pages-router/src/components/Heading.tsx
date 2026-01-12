import React from 'react';
// Sticking to your specific import path
import { Text, Field } from '@sitecore-content-sdk/nextjs';

interface Fields {
  // Matching the field name from your Sitecore Template image
  headline: Field<string>;
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
        <h1>
          <Text field={props.fields.headline} />
        </h1>
        Hi from Heading component! 23
      </div>
    </div>
  );
};
