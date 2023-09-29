/**
 * Description:
 * This file initializes a new Vue instance that serves as a global event bus for the application.
 * The EventBus enables different Vue components to communicate with each other without requiring to be
 * directly linked. Components can emit events to the bus and also listen for events emitted by other components.

 * Usage:
 * 1. Emitting an event: EventBus.$emit('event-name', payload)
 * 2. Listening to an event: EventBus.$on('event-name', callback)

 * Current Implementations:
 * - Used in Map.vue for emitting new location data.
 * - Used in journalEntry.vue for listening to and processing new location data.

 * Future Scope:
 * Can be used for any cross-component communication needs that may arise in future development.
 */

import Vue from 'vue'
export const EventBus = new Vue()
