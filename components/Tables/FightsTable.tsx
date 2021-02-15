import Link from "next/link";
import styled from "styled-components";
import { Fight as FightType } from "../../../types/types";
import createLink from "../../../utils/createLink";

type TableProps = {
  rows: FightType[];
};

const FightsTable: React.FC<TableProps> = ({ rows }) => {
  if (rows[0].error) return <div>{rows[0].error}</div>;

  const renderFighter = (fighter: string) => {
    if (fighter.includes("|")) {
      let arr = fighter.split("|");
      return (
        <Link href={`/fighters/${createLink(arr[1])}`}>
          <a>{arr[0]}</a>
        </Link>
      );
    }
    return fighter;
  };

  return (
    <Container>
      <thead>
        <tr>
          <th>Weight</th>
          <th>Fighters</th>
          <th>Result</th>
          <th>Round</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((fight: FightType) => (
          <tr key={fight.id}>
            <td>{fight.division}</td>
            <td>
              {renderFighter(fight.fighters[0])} {fight.fighters[1]}{" "}
              {renderFighter(fight.fighters[2])}
            </td>
            {fight.outcome ? (
              fight.outcome.map((info, i) => <td key={i}>{info}</td>)
            ) : (
              <>
                <td></td>
                <td></td>
                <td></td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </Container>
  );
};

const Container = styled.table`
  margin: auto;
`;

export default FightsTable;