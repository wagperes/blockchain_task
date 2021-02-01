"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const react_data_table_component_1 = __importDefault(require("react-data-table-component"));
const Card_1 = __importDefault(require("@material-ui/core/Card"));
const ArrowDownward_1 = __importDefault(require("@material-ui/icons/ArrowDownward"));
require("./styles.css");
// const blocks: any[] = [
//   {"height":668269,"hash":"00000000000000000009048f13acae9065d456e352410aa8437d5483016dd346","time":1611966100,"main_chain":true},{"height":668270,"hash":"000000000000000000041aba6510a5192ebe552fea7a6f103cc798b5d503d164","time":1611966189,"main_chain":true},{"height":668271,"hash":"00000000000000000003f858b1d9c7a22beccf1c92dd9b20aa62cde607d0d49e","time":1611966456,"main_chain":true},{"height":668272,"hash":"0000000000000000000412ccdb3f343353c87f4b5c5f4465fcf3dc0291d82bfa","time":1611966508,"main_chain":true},{"height":668273,"hash":"00000000000000000000923540c1533b2db89fa15c014952f46aee1984810f8d","time":1611966915,"main_chain":true},{"height":668274,"hash":"00000000000000000002972b5d0b0b7b9650b5fce791ab9ea06f78fada4b1397","time":1611967026,"main_chain":true},{"height":668275,"hash":"00000000000000000005c8682fac322d0939a92e4f5629488af061e82b7315c8","time":1611967420,"main_chain":true}
// ];
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
        format: (row) => new Date(row.time).toString(),
    },
    {
        name: "Height",
        selector: "height",
        sortable: true,
        right: true
    }
];
// function useGetBlocks() {
//   const [blocks, setBlocks] = useState([]);
//   const [error, setError] = useState([]);
//   async function GetBlocks() {
//     console.log('Enter in getBlocks!!!!!!!!!!!!!!!!!');
//     try {
//       const response = await axios.get('http://localhost:9000/blocks');
//       setBlocks(response.data.blocks);
//       console.log(`response.data.blocks: ${response.data.blocks}`);
//     } catch (error) {
//       setError(error);
//     }
//     useEffect(() => {
//       GetBlocks();
//     }, []);
//     return blocks;
//   }
// }
function App() {
    const [blocks, setBlocks] = react_1.useState([]);
    const [error, setError] = react_1.useState([]);
    react_1.useEffect(() => {
        fetchItems();
    }, []);
    const fetchItems = async () => {
        try {
            const response = await axios_1.default.get('http://localhost:9000/blocks');
            setBlocks(response.data.blocks);
            console.log(`response.data.blocks: ${response.data.blocks}`);
        }
        catch (error) {
            setError(error);
        }
    };
    return (<div className="App">
      <Card_1.default>
        <react_data_table_component_1.default title="Blocks List" columns={columns} data={blocks} defaultSortFieldId="hash" sortIcon={<ArrowDownward_1.default />} pagination selectableRows/>
      </Card_1.default>
    </div>);
}
exports.default = App;
