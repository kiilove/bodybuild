import { Table } from "flowbite-react";
import { TableHead } from "flowbite-react/lib/esm/components/Table/TableHead";

export const BasicTable = (props) => {
  const tHeader = props.tHeader;
  const tData = props.tData;

  <Table>
    <Table.Head>
      {tHeader.map((item, idx) => (
        <TableHead.HeadCell></TableHead.HeadCell>
      ))}
    </Table.Head>
    <Table.Body>
      {tData ? (
        tData.map((dItem, dIdx) => (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>$2999</Table.Cell>
          </Table.Row>
        ))
      ) : (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  </Table>;
};
