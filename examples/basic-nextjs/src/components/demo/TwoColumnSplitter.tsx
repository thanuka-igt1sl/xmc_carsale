import React from "react";
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from "@sitecore-content-sdk/nextjs";

interface TwoColumnSplitterProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: TwoColumnSplitterProps): React.ReactElement => {
  const { rendering, params } = props;

  // SXA components pass styles through the 'Styles' parameter
  const containerStyles = params?.Styles?.trim() ?? "";

  // Calculate columns based on the 'ColumnWidth' parameters in your template
  const columnCount = Object.keys(params).filter((key) =>
    key.startsWith("ColumnWidth"),
  ).length;

  return (
    <div className={`component column-splitter ${containerStyles}`}>
      <div className="row">
        {[...Array(columnCount)].map((_, index) => {
          const columnName = `column-${index}`;
          // Get the specific width class (e.g., col-md-6) from the parameters
          const columnWidthClass = params[`ColumnWidth${index}`] ?? "col-sm";

          return (
            <div key={index} className={columnWidthClass}>
              <Placeholder name={columnName} rendering={rendering} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
