/*
    A polyfill that makes the string arguments in the existing sa:mp callback function return to the samp-node event as byte arrays.
	Author: YuCarl77
*/

#include <a_samp>
#include <omp>
#include <streamer>
#include <samp-node>

main() {}

forward OnClientMessage(color, text[]);
public OnClientMessage(color, text[]) {
    return SAMPNode_CallEvent("OnClientMessageI18n", color, text, strlen(text));
}

public OnDialogResponse(playerid, dialogid, response, listitem, inputtext[]) {
    return SAMPNode_CallEvent("OnDialogResponseI18n", playerid, dialogid, response, listitem, inputtext, strlen(inputtext));
}

forward OnNPCDisconnect(reason[]);
public OnNPCDisconnect(reason[]) {
    return SAMPNode_CallEvent("OnNPCDisconnectI18n", reason, strlen(reason));
}

public OnPlayerCommandText(playerid, cmdtext[]) {
    return SAMPNode_CallEvent("OnPlayerCommandTextI18n", playerid, cmdtext, strlen(cmdtext));
}

public OnPlayerText(playerid, text[]) {
    return SAMPNode_CallEvent("OnPlayerTextI18n", playerid, text, strlen(text));
}

public OnRconCommand(cmd[]) {
    return SAMPNode_CallEvent("OnRconCommandI18n", cmd, strlen(cmd));
}

public OnRconLoginAttempt(ip[], password[], success) {
    return SAMPNode_CallEvent("OnRconLoginAttemptI18n", ip, strlen(ip), password, strlen(password), success);
}

public OnDynamicObjectMoved(objectid) {
    return SAMPNode_CallEvent("OnDynamicObjectMoved", objectid);
}

public OnPlayerEditDynamicObject(playerid, STREAMER_TAG_OBJECT:objectid, response, Float:x, Float:y, Float:z, Float:rx, Float:ry, Float:rz) {
    return SAMPNode_CallEvent("OnPlayerEditDynamicObject", playerid, objectid, response, x, y, z, rx, ry, rz);
}

public OnPlayerSelectDynamicObject(playerid, STREAMER_TAG_OBJECT:objectid, modelid, Float:x, Float:y, Float:z) {
    return SAMPNode_CallEvent("OnPlayerSelectDynamicObject", playerid, objectid, modelid, x, y, z);
}

public OnPlayerShootDynamicObject(playerid, weaponid, STREAMER_TAG_OBJECT:objectid, Float:x, Float:y, Float:z) {
    return SAMPNode_CallEvent("OnPlayerShootDynamicObject", playerid, weaponid, objectid, x, y, z);
}

public OnPlayerPickUpDynamicPickup(playerid, STREAMER_TAG_PICKUP:pickupid) {
    return SAMPNode_CallEvent("OnPlayerPickUpDynamicPickup", playerid, pickupid);
}

public OnPlayerEnterDynamicCP(playerid, STREAMER_TAG_CP:checkpointid) {
    return SAMPNode_CallEvent("OnPlayerEnterDynamicCP", playerid, checkpointid);
}

public OnPlayerLeaveDynamicCP(playerid, STREAMER_TAG_CP:checkpointid) {
    return SAMPNode_CallEvent("OnPlayerLeaveDynamicCP", playerid, checkpointid);
}

public OnPlayerEnterDynamicRaceCP(playerid, STREAMER_TAG_RACE_CP:checkpointid) {
    return SAMPNode_CallEvent("OnPlayerEnterDynamicRaceCP", playerid, checkpointid);
}

public OnPlayerLeaveDynamicRaceCP(playerid, STREAMER_TAG_RACE_CP:checkpointid) {
    return SAMPNode_CallEvent("OnPlayerLeaveDynamicRaceCP", playerid, checkpointid);
}

public OnPlayerEnterDynamicArea(playerid, STREAMER_TAG_AREA:areaid) {
    return SAMPNode_CallEvent("OnPlayerEnterDynamicArea", playerid, areaid);
}

public OnPlayerLeaveDynamicArea(playerid, STREAMER_TAG_AREA:areaid) {
    return SAMPNode_CallEvent("OnPlayerLeaveDynamicArea", playerid, areaid);
}

public OnPlayerGiveDamageDynamicActor(playerid, STREAMER_TAG_ACTOR:actorid, Float:amount, weaponid, bodypart) {
    return SAMPNode_CallEvent("OnPlayerGiveDamageDynamicActor", playerid, actorid, amount, weaponid, bodypart);
}

public OnDynamicActorStreamIn(STREAMER_TAG_ACTOR:actorid, forplayerid) {
    return SAMPNode_CallEvent("OnDynamicActorStreamIn", actorid, forplayerid);
}

public OnDynamicActorStreamOut(STREAMER_TAG_ACTOR:actorid, forplayerid) {
    return SAMPNode_CallEvent("OnDynamicActorStreamOut", actorid, forplayerid);
}

public Streamer_OnItemStreamIn(type, STREAMER_ALL_TAGS:id, forplayerid) {
    return SAMPNode_CallEvent("Streamer_OnItemStreamIn", type, id, forplayerid);
}

public Streamer_OnItemStreamOut(type, STREAMER_ALL_TAGS:id, forplayerid) {
    return SAMPNode_CallEvent("Streamer_OnItemStreamOut", type, id, forplayerid);
}

public Streamer_OnPluginError(const error[]) {
    return SAMPNode_CallEvent("Streamer_OnPluginError", error);
}
