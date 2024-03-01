import {createContext, useContext, useState} from 'react';
import { data as FileData } from './assets/data.json'
import { LineChartData } from './line-chart'

export interface IDataContext {
   getTableData: () => [],
   getChartData: (itemKey: string) => LineChartData | undefined,
}

export const DataContext = createContext<IDataContext>({
   getTableData: () => [],
   getChartData: () => undefined,
})

export function useData() {
   return useContext(DataContext)
}

const getRandomColor = (): string => {
   const red = Math.floor(Math.random() * 256);
   const green = Math.floor(Math.random() * 256);
   const blue = Math.floor(Math.random() * 256);
   return `rgb(${red},${green},${blue})`;
};

export function DataProvider({ children }: { children: React.ReactElement | React.ReactElement[] }) {
   const [data] = useState(FileData)

   console.log('data', data);

   const getTableData = () => {
      const keys = Object.keys(data.Total)
      return keys.map(key => ({
         network: key,
         ...data.Total[key]
      }));
   }
   const getChartData = (itemKey: string) => {
      const {Total, ...items} = data
      const keys = Object.keys(Total)
      const labels = Object.keys(items)
      const datasets =  keys.map(key => {
         return {
            label: key,
            fill: false,
            data: labels.map(label => data[label][key][itemKey]),
            borderColor: getRandomColor()
         }
      })
      return {
         labels,
         datasets
      }
   }

   const context = {
      getTableData,
      getChartData
   }

   return <DataContext.Provider value={context}>{children}</DataContext.Provider>
}