import React from 'react';
import { Field, Text } from '@sitecore-content-sdk/nextjs';
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
  const containerStyles = props.params?.styles || '';
  const gridStyles = props.params?.GridParameters || '';
  const styles = `${gridStyles} ${containerStyles}`.trim();

  // 2. Fix: Access the .value property of the Field object
  // Also ensuring we handle cases where fields might be undefined
  const buttonStyles = props.fields?.style?.value || ''; 
  return (
    <div className={`container-default component ${styles}`}>      
     <button type="button" className={buttonStyles}><Text field={props.fields.name} /></button>
     <Text field={props.fields.icon} />    
    </div>
    
  );
};
