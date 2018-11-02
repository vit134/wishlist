export const TOGGLE_OVERLAY = 'TOGGLE_OVERLAY';

export function toggleOverlay(content) {
    return {
        type: TOGGLE_OVERLAY,
        content
    };
}
