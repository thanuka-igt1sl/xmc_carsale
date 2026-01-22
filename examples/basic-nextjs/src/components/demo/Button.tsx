import React from "react";
import { Field, Text } from "@sitecore-content-sdk/nextjs";
interface Fields {
  name: Field<string>;
  style: Field<string>;
  icon: Field<string>;
}
type ButtonProps = {
  params: { [key: string]: string };
  fields: Fields;
};
export const Default = (props: ButtonProps): React.ReactElement => {
  // 1. Handle Component Parameters (Standard Sitecore practice)
  const containerStyles = props.params?.styles || "";
  const gridStyles = props.params?.GridParameters || "";
  const styles = `${gridStyles} ${containerStyles}`.trim();

  // 2. Fix: Access the .value property of the Field object
  // Also ensuring we handle cases where fields might be undefined
  const buttonStyles = props.fields?.style?.value || "";
  return (
    <div className={`container-default component ${styles}`}>
      <a href="#" className={buttonStyles} role="button">
        {props.fields.icon?.value && (
          <span
            dangerouslySetInnerHTML={{ __html: props.fields.icon.value }}
            className="w-5 h-5"
          />
        )}
        <Text field={props.fields.name} />
      </a>

    </div>
  );
};
