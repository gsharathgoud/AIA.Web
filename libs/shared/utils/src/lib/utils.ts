import { Embed, service } from 'powerbi-client';

/**
 * Type for event handler function of embedded entity
 */
export type EventHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event?: service.ICustomEvent<any>,
  embeddedEntity?: Embed
) => void | null;

/**
 * Get JSON string representation of the given map.
 *
 * @param map Map of event and corresponding handler method
 *
 */
export const stringifyMap = (map: Map<string, EventHandler | null> | undefined): string => {
  // Return empty string for empty/null map
  if (!map) {
    return '';
  }

  // Get entries of map as array
  const mapEntries = Array.from(map);

  // Return JSON string
  return JSON.stringify(
    mapEntries.map((mapEntry) =>
      // Convert event handler method to a string containing its source code for comparison
      [mapEntry[0], mapEntry[1] ? mapEntry[1].toString() : '']
    )
  );
};
