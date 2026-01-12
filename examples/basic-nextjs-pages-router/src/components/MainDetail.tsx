import React from 'react';
import { Field, RichText, RichTextField } from '@sitecore-content-sdk/nextjs';

interface Fields {
  Title: Field<string>;
  Text: Field<RichTextField>;
}

type MainDetailProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: MainDetailProps): React.ReactElement => {
  const containerStyles = props.params && props.params.styles ? props.params.styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();

  return (
    <div className={`container-default component ${styles}`}>
      <div data-class-change className={containerStyles}>
        This container must be refreshed without reloading the page.
      </div>
      <h1 className="component-content title row">
        <RichText field={props.fields.Title} />
      </h1>
      <div className="component-content text row">
        <RichText field={props.fields.Text.value} />
      </div>
    </div>
  );
};

