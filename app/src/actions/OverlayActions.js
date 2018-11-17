export const TOGGLE_OVERLAY = 'TOGGLE_OVERLAY';

export function toggleOverlay(content, transparent) {
    return {
        type: TOGGLE_OVERLAY,
        content,
        transparent
    };
}
