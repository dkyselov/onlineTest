import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from './table';
import { useData } from './data-context';
import {LineChart, LineChartData} from "./line-chart";

function App() {
    const { getTableData, getChartData } = useData()

    return (
        <>
           <Table data={getTableData()} key={'table'}/>
           <LineChart data={getChartData('daily_revenue') as LineChartData} key={'revenue'}/>
           <LineChart data={getChartData('spend') as LineChartData} key={'spend'}/>
        </>
    )
}

export default App
