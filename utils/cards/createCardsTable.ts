import { Card } from "../../types/types";
import { getSectionIndex, getTableData } from "../../api/wiki";

export default async (page: string, title: string) => {
  const sectionIndex = await getSectionIndex(page, title);
  const rows = await getTableData(page, sectionIndex);
  const cards: Card[] = [];

  rows
    .map((row: string) => {
      // extract wikipedia link for individual cards
      let links = row.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g);
      let link = "";

      if (links) link = links[0].replace(/(<a href=")|(")/g, "");

      // remove html tags
      const item = row.split(/<.+?>/g).filter((text) => text);
      item.unshift(link);

      return item;
    })
    .forEach((item: string[], id: number) => {
      if (item.length >= 5 && item[1] !== "–" && item[4] !== "TBD") {
        let isUpcoming = title === "Scheduled events";

        let card = {
          id: isUpcoming ? id : Number(item[1]),
          title: isUpcoming ? item[1] : item[2],
          date: isUpcoming ? item[2] : item[3],
          venue: isUpcoming ? item[3] : item[4],
          city: isUpcoming ? item[4] : item[5],
          country: isUpcoming ? item[5] : item[6],
          link: item[0],
        };

        if (item[5] === ", ") {
          card.city = `${item[4]}, ${item[6]}`;
          card.country = item[7];
        }

        isUpcoming ? cards.unshift(card) : cards.push(card);
      }
    });

  return cards;
};