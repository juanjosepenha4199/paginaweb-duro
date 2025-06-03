import React from 'react';

interface ThreeColumnLayoutProps {
  sidebar1Content?: React.ReactNode;
  articleContent: React.ReactNode;
  sidebar2Content?: React.ReactNode;
}

const ThreeColumnLayout: React.FC<ThreeColumnLayoutProps> = ({
  sidebar1Content,
  articleContent,
  sidebar2Content,
}) => {
  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Sidebar 1 */}
        {sidebar1Content && (
          <aside className="md:col-span-1 lg:col-span-1">
            {sidebar1Content}
          </aside>
        )}

        {/* Article */}
        <main 
          className={
            `col-span-1 ${
              sidebar1Content && sidebar2Content ? 'md:col-span-2 lg:col-span-3' :
              sidebar1Content || sidebar2Content ? 'md:col-span-3 lg:col-span-4' :
              'md:col-span-4 lg:col-span-5'
            }`
          }
        >
          {articleContent}
        </main>

        {/* Sidebar 2 */}
        {sidebar2Content && (
          <aside className="md:col-span-1 lg:col-span-1">
            {sidebar2Content}
          </aside>
        )}
      </div>
    </div>
  );
};

export default ThreeColumnLayout; 