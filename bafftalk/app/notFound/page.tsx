import React from 'react'

const NotFound = () => {
    return (
        <div className="flex flex-col gap-1 px-2 xl:px-8 w-full lg:w-[calc(100vw-260px)] lg:ml-[255px]">
            <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)]">
                <h1 className="text-4xl font-bold">404</h1>
                <h1 className="text-2xl font-bold">Page Not Found</h1>
            </div>
        </div>
      );
}

export default NotFound
