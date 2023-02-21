import { MessageGroup } from "$lib/Chat/groups";
import { MessageTypes, type Message } from "$lib/Storage/messages";

const groupable_types = [MessageTypes.Join, MessageTypes.Quit, MessageTypes.Part];

export const isAGroup = (input: Message | MessageGroup): input is MessageGroup => {
    // eslint-disable-next-line no-prototype-builtins
    if (input.hasOwnProperty('messages')) return true;
    else return false;
};

export const group = (msgs: Message[]) => {
    const grouped: (Message | MessageGroup)[] = [];

    msgs.forEach((o) => {
        const last_elem = grouped.at(grouped.length - 1);
        // if (last_elem && !isAGroup(last_elem) && o.timestamp.getHours() > last_elem.timestamp.getHours()) grouped.push({
        //     target: "#tubes",
        //     command: "PRIVMSG",
        //     type: MessageTypes.PrivMsg,
        //     network: "6",
        //     timestamp: new Date(Date.now()),
        //     content: `${o.timestamp.getHours()}`,
        // });
        if (groupable_types.includes(o.type)) {
            if (last_elem && isAGroup(last_elem)) last_elem.add(o);
            else grouped.push(new MessageGroup([o]));
        }
        else grouped.push(o);
    });

    return grouped;
}