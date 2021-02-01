import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import "./styles.css";

const blockDetailsCache = new Map();
const columns = [
  {
    name: "Hash",
    selector: "hash",
    sortable: true
  },
  {
    name: "Time",
    selector: "time",
    sortable: true,
    format: (row: any) => new Date(row.time * 1000).toString(),
  },
  {
    name: "Height",
    selector: "height",
    sortable: true
  }
];
const columnDetails = [
  {
    name: "Size",
    selector: "size",
    sortable: true,
    format: (row: any) => new Intl.NumberFormat().format(row.size).toString() + ' bytes',
  },
  {
    name: "Block index",
    selector: "block_index",
    sortable: true
  },
  {
    name: "Previous hash",
    selector: "prev_block",
    sortable: true
  },
  {
    name: "Number of Transactions",
    selector: "n_tx",
    sortable: true
  },
];
const txDetails = [
  {
    name: "Hash",
    selector: "hash",
    sortable: true
  },
  {
    name: "Time",
    selector: "time",
    sortable: true,
    format: (row: any) => new Date(row.time * 1000).toString(),
  },
  {
    name: "Size",
    selector: "size",
    sortable: true,
    format: (row: any) => new Intl.NumberFormat().format(row.size).toString() + ' bytes',
  }
];

const TxDetails = (row: any) => {
  return (
    <div className="RowDetail">
      <Card>
        <DataTable
          title="Transaction details"
          columns={txDetails}
          data={row.data.tx}
          defaultSortFieldId="size"
          sortIcon={<SortIcon />}
          pagination
          noDataComponent={'No data has being found for this row.'}
        />
      </Card>
    </div>
  );

}

const RowDetail = (row: any) => {
  const [blockDetail, setBlockDetail] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    if (blockDetailsCache.has(row.data.hash)) {
      setBlockDetail(blockDetailsCache.get(row.data.hash));
      setLoading(false);
    } else {
      try {
        const response = await axios.get(`http://localhost:9000/blocks/${row.data.hash}`);
        const data = response.data ?? {};
        setBlockDetail(data);
        blockDetailsCache.set(row.data.hash, data);
        setLoading(false);
      } catch (e) {
        setError(e);
        console.log(error);
      }
    }
    
  };
  
  return (
    <div className="RowDetail">
      <Card>
        <DataTable
          title="Block Details"
          columns={columnDetails}
          data={[blockDetail]}
          defaultSortFieldId="size"
          sortIcon={<SortIcon />}
          pagination
          noDataComponent={'No data has being found for this row.'}
          progressPending={loading}
          expandableRows
          expandableRowsComponent={<TxDetails />}
        />
      </Card>
    </div>
  );
};

const App = () => {
  const [blocks, setBlocks] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:9000/blocks');
      setBlocks(response.data.blocks);
      setLoading(false);
    } catch (e) {
      setError(e);
      console.log(error);
    }
  };
  return (
    <div className="App">
      <Card>
        <DataTable
          title="Latest Blocks"
          columns={columns}
          data={blocks}
          defaultSortFieldId="time"
          sortIcon={<SortIcon />}
          pagination
          expandOnRowClicked
          highlightOnHover
          progressPending={loading}
          expandableRows
          expandableRowsComponent={<RowDetail />}
        />
      </Card>
    </div>
  );
}

export default App;
