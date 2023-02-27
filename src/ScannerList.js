import React from "react";

const ScannerList = ({ scanners }) => {
  return (
    <div>
      <h2 className="text-2xl mt-6 md:mt-12 py-2 font-medium md:text-2xl animate-text bg-gradient-to-r from-blue-500 via-white to-cyan-500 bg-clip-text text-transparent ">
        Available Scanners
      </h2>
      <ul>
        <div className="  mb-6 md:mb-12 border-zinc-400 border-opacity-50 shadow-inner inset shadow-white w-11/12 md:w-2/3 p-4 mx-auto justify-center rounded-lg bg-gradient-to-tr from-slate-700 via-black to-slate-700">
          <div className="text-white md:mt-12 md:text-left text-center">
            Scanners Found: {scanners.length}
          </div>
          <div className="mt-4 mb-6">
            <hr style={{ borderTop: "1px solid white" }} />
          </div>
          <div className="flex text-white mt-4 mb-8 text-xs md:text-base">
            <h3 className="w-2/5 text-left">
              Scanner Name
            </h3>
            <h3 className="w-1/5 text-center">IP Address</h3>
            <h3 className="w-1/5 text-center">Speed (m/s)</h3>
            <h3 className="w-1/5">Status</h3>
            <h3 className="w-1/5"></h3>
          </div>

          {scanners.map((scanner, index) => (
            <div
              className="flex items-start mt-4 text-white text-xs md:text-base"
              key={index}
            >
              <div className="w-2/5 text-left">
                <p className="">{scanner.scannerName}</p>
              </div>
              <div className="w-1/5 text-center">
                <p className="">{scanner.ipAddress}</p>
              </div>
              <div className="w-1/5 text-center">
                <p className="">{scanner.scannerSpeed}</p>
              </div>
              <div className="w-1/5 text-center">
                <p className="">
                  {scanner.isAvailable ? "Available" : "Not Available"}
                </p>
              </div>
              <div className="w-1/5 text-right">
                <p className="">
                  {scanner.isAvailable ? (
                    <span className="bg-gradient-to-tr from-blue-700 via-cyan-800 to-cyan-700 rounded-full px-2 md:px-4 py-1">
                      CONNECT
                    </span>
                  ) : (
                    <span className="bg-gray-500 rounded-full px-2 md:px-4 py-1">
                      CONNECT
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default ScannerList;
