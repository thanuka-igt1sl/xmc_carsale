import React from 'react';
import { ComponentParams, ComponentRendering, Placeholder } from   "@sitecore-content-sdk/nextjs";

interface ColumnSplitterProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ColumnSplitterProps): React.ReactElement => {
  const { rendering, params } = props;

  // SXA passes custom styles through 'Styles' and widths through 'ColumnWidthX'
  const containerStyles = params?.Styles?.trim() ?? '';
  const gridParameters = params?.GridParameters?.trim() ?? '';
  
  // Count how many 'ColumnWidth' parameters are present in the rendering data
  const columnCount = Object.keys(params).filter((key) => key.startsWith('ColumnWidth')).length;

  return (
    <div className={`component column-splitter ${gridParameters} ${containerStyles}`}>
      <div className="row">
        {/* SXA typically starts column indices at 1 or 0 depending on version */}
        {[...Array(columnCount)].map((_, index) => {
          // Adjust index if your template starts at ColumnWidth0
          const columnKey = `ColumnWidth${index + 1}`; 
          const columnWidthClass = params[columnKey] ?? 'col-sm';
          const placeholderName = `column-${index + 1}`;

          return (
            <div key={index} className={columnWidthClass}>
              <Placeholder name={placeholderName} rendering={rendering} />
            </div>
          );
        })}
      </div>
    </div>
  );
};