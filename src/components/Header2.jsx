import { Plus, MoreHorizontal, RefreshCw, Clock, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCategoryManager } from '../slices/dashboardSlice';

const Header2 = () => {
  const showCategoryManager=useSelector(state=>state.dashboard.showCategoryManager);
  const dispatch=useDispatch();
  return (
    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        {/* Left side - Dashboard title */}
        <h1 className="text-lg font-semibold text-gray-900">
          CNAPP Dashboard
        </h1>
        
        {/* Right side - Controls */}
        <div className="flex items-center space-x-4">
          {/* Add Widget button */}
          <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors border px-4 py-2 rounded"
          onClick={()=>{
            dispatch(setShowCategoryManager(!showCategoryManager));
          }}
          >
            <span className="text-sm font-medium">Add Widget</span>
            <Plus className="w-4 h-4" />
          </button>
          
          {/* Refresh button */}
          <button className="p-1 text-gray-600 hover:text-gray-900 transition-colors border rounded p-2">
            <RefreshCw className="w-4 h-4" />
          </button>
          
          {/* More options button */}
          <button className="p-1 text-gray-600 hover:text-gray-900 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
          
          {/* Time period dropdown */}
          <div className="relative ">
            <button className="flex items-center space-x-2 px-2 py-2 bg-white border border-indigo-900 border-2 rounded-md text-sm font-medium  transition-colors">
              <div className="h-2 rounded-full"></div>
              <Clock className="w-4 h-4 bg-indigo-900 text-white rounded-full"  />
              <span className='text-indigo-900'>| Last 2 days</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header2;