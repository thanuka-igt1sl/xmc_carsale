import React from "react";
import { Field, Item, RichText } from "@sitecore-content-sdk/nextjs";
interface Fields {
  headline: Field<string>;
  description: Field<string>;
  CryptoList: Item[];
}
type CryptocurrenciesProps = {
  params: { [key: string]: string };
  fields: Fields;
};
export const Default = (props: CryptocurrenciesProps): React.ReactElement => {
  const containerStyles =
    props.params && props.params.styles ? props.params.styles : "";
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  //const cryto = props.fields?.CryptoList?.CryptoList || '';
  const cryto = props.fields?.CryptoList || [];
  console.log("Cryptocurrencies props", cryto);
  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          <RichText field={props.fields.headline} />
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:mb-12 lg:text-xl dark:text-gray-400">
          <RichText field={props.fields.description} />
          <span className="font-medium text-gray-900 dark:text-white">
            600+
          </span>{" "}
          cryptocurrencies on Flowbite
        </p>
      </div>

      <div className="grid gap-6 lg:gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {cryto.map((item) => (
          <div
            key={item.id}
            className={
              (item.fields?.headlineStyle as Field<string>)?.value ||
              "p-4 text-primary-700 bg-primary-100 rounded-lg dark:bg-primary-900 dark:text-primary-300"
            }
          >
            <h2 className="text-3xl font-extrabold leading-tight">
              {(item.fields?.headline as Field<string>)?.value}
            </h2>
            <span className="text-primary-500 dark:text-primary-400">
              {(item.fields?.description as Field<string>)?.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
