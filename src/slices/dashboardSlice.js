import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

/**
 * Initial sample data matching assignment expectations.
 * You can change this JSON to whatever initial categories/widgets you want.
 */
const initialState = {
  categories: [
    { id: 'cspm', name: 'CSPM Executive dashboard', widgetIds: ['w1', 'w2'] },
    { id: 'cwpp', name: 'CWPP Dashboard', widgetIds: ['w3','w4','w1'] },
    { id: 'rscan', name: 'Registry Scan', widgetIds: ['w5','w6'] }
  ],
  widgets: [
    { id: 'w1', title: 'Cloud', text: 'sdsadasd', categoryIds: ['cspm'] },
    { id: 'w2', title: 'Cloud acounts risk assesment', text: 'sdsdasdasd', categoryIds: ['cspm'] },
    { id: 'w3', title: 'Top 5 Namespace specific alerts', text: 'Revenue numbers and growth', categoryIds: ['cwpp'] },
    { id: 'w4', title: 'Workload alerts', text: 'Revenue numbers and growth', categoryIds: ['cwpp'] },
    { id: 'w5', title: 'Image  risk assesment', text: 'Revenue numbers and growth', categoryIds: ['rscan'] },
    { id: 'w6', title: 'Image security issues', text: 'Revenue numbers and growth', categoryIds: ['rscan'] }
  ],
  showCategoryManager:false,
  searchQuery:null
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addCategory(state, action) {
      // payload: { name }
      const id = uuidv4();
      state.categories.push({ id, name: action.payload.name, widgetIds: [] });
    },
    addWidget(state, action) {
      // payload: { title, text, categoryId }
      const id = uuidv4();
      const { title, text, categoryId } = action.payload;
      const widget = { id, title, text, categoryIds: categoryId ? [categoryId] : [] };
      state.widgets.push(widget);
      if (categoryId) {
        const cat = state.categories.find(c => c.id === categoryId);
        if (cat && !cat.widgetIds.includes(id)) cat.widgetIds.push(id);
      }
    },
    removeWidgetFromCategory(state, action) {
      // payload: { widgetId, categoryId }
      const { widgetId, categoryId } = action.payload;
      const cat = state.categories.find(c => c.id === categoryId);
      if (cat) cat.widgetIds = cat.widgetIds.filter(id => id !== widgetId);

      const w = state.widgets.find(w => w.id === widgetId);
      if (w) w.categoryIds = w.categoryIds.filter(c => c !== categoryId);
    },
    deleteWidget(state, action) {
      // payload: { widgetId }
      const wid = action.payload.widgetId;
      state.widgets = state.widgets.filter(w => w.id !== wid);
      state.categories.forEach(c => {
        c.widgetIds = c.widgetIds.filter(id => id !== wid);
      });
    },
    toggleWidgetCategory(state, action) {
      // payload: { widgetId, categoryId, checked }
      const { widgetId, categoryId, checked } = action.payload;
      const cat = state.categories.find(c => c.id === categoryId);
      const w = state.widgets.find(w => w.id === widgetId);
      if (checked) {
        if (cat && !cat.widgetIds.includes(widgetId)) cat.widgetIds.push(widgetId);
        if (w && !w.categoryIds.includes(categoryId)) w.categoryIds.push(categoryId);
      } else {
        if (cat) cat.widgetIds = cat.widgetIds.filter(id => id !== widgetId);
        if (w) w.categoryIds = w.categoryIds.filter(c => c !== categoryId);
      }
    },
    setStateFromJson(state, action) {
      // payload: { categories, widgets } - replace whole structure (optional)
      state.categories = action.payload.categories || [];
      state.widgets = action.payload.widgets || [];
    },
    setShowCategoryManager(state,action){
      state.showCategoryManager=action.payload;
    },
    setSearchQuery(state, action){
      state.searchQuery=action.payload
    }
  }
});

export const {
  addCategory,
  addWidget,
  removeWidgetFromCategory,
  deleteWidget,
  toggleWidgetCategory,
  setStateFromJson,
  setShowCategoryManager,
  setSearchQuery
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
