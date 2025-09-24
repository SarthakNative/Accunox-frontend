import { Plus, MoreHorizontal, RefreshCw, Clock, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCategoryManager } from '../slices/dashboardSlice';

const Header2 = () => {
  const showCategoryManager = useSelector(state => state.dashboard.showCategoryManager);
  const dispatch = useDispatch();
  
  return (
    <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Left side - Dashboard title */}
        <h1 className="text-base sm:text-lg font-semibold text-gray-900">
          CNAPP Dashboard
        </h1>
        
        {/* Right side - Controls */}
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {/* Add Widget button */}
          <button 
            className="flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-gray-900 transition-colors border px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm flex-1 sm:flex-initial justify-center sm:justify-start"
            onClick={() => {
              dispatch(setShowCategoryManager(!showCategoryManager));
            }}
          >
            <span className="text-xs sm:text-sm font-medium">Add Widget</span>
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          
          {/* Refresh button */}
          <button className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 transition-colors border rounded">
            <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          
          {/* More options button - Hidden on mobile, visible on sm and up */}
          <button className="hidden sm:block p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
          
          {/* Time period dropdown */}
          <div className="relative">
            <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white border border-indigo-900 border-2 rounded-md text-xs sm:text-sm font-medium transition-colors">
              <div className="h-2 rounded-full hidden sm:block"></div>
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 bg-indigo-900 text-white rounded-full" />
              <span className='text-indigo-900 xs:hidden'>| Last 2 days</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header2;