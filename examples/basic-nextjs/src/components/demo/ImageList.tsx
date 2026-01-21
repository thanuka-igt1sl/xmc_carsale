import React from "react";
import { Field, Item, RichText } from "@sitecore-content-sdk/nextjs";

interface Fields {
  Title: Field<string>;
  Imagelist: Item[];
}
type HeadingProps = {
  params: { [key: string]: string };
  fields: Fields;
};
export const Default = (props: HeadingProps): React.ReactElement => {
  const containerStyles =
    props.params && props.params.styles ? props.params.styles : "";
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  const imgList = props.fields?.Imagelist || [];
  console.log("Image List Items:", imgList);
  return (
    <div className={`container-default component ${styles}`}>
      <div className="component-content text row">
        <RichText field={props.fields.Title} />
      </div>
      <div className="flex items-center mt-3 max-w-md">
        {imgList.map((item, index) => (
          <div key={item.id || index}>
            {/* Replace with your actual image component or logic */}
            <img src={item.url} alt={item.displayName || "List image"} className="w-auto h-8 md:h-12 mr-4"/>
          </div>
        ))}
      </div>
    </div>
  );
};
