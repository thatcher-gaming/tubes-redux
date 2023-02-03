import { MessageTypes, type Message } from "$lib/Storage/messages";
import type { SvelteComponent } from "svelte";
import InvalidMessage from "./MessageTypes/InvalidMessage.svelte";
import Join from "./MessageTypes/Join.svelte";
import Part from "./MessageTypes/Part.svelte";
import PrivMsg from "./MessageTypes/PrivMsg.svelte";
import Quit from "./MessageTypes/Quit.svelte";
import Notice from "./MessageTypes/Notice.svelte";

export async function showMessage(m: Message): Promise<typeof SvelteComponent> {
    if (m.type == MessageTypes.PrivMsg) return PrivMsg;
    if (m.type == MessageTypes.Join) return Join;
    if (m.type == MessageTypes.Part) return Part;
    if (m.type == MessageTypes.Quit) return Quit;
    if (m.type == MessageTypes.Notice) return Notice;
    return InvalidMessage
}