import { describe, it, expect } from 'vitest';
import { mergeJsons } from './json'; // Ensure the path is correct
import mockData from './mockData.json';

describe('mergeJsons', () => {
  it('should add new sagas if they do not exist in the existing JSON', () => {
    const existing: Serie = {};

    const result = mergeJsons(mockData, existing);

    expect(result).toEqual(mockData);
  });

  it('should add new arcs if they do not exist in an existing saga', () => {
    const latest: Serie = {
      saga1: {
        arc2: [{ title: 'Episode 1', duration: 278634, watched: false }],
      },
    };

    const existing: Serie = {
      saga1: {
        arc1: [{ title: 'Episode A', duration: 278634, watched: false }],
      },
    };

    const result = mergeJsons(latest, existing);

    expect(result).toEqual({
      saga1: {
        arc1: [{ title: 'Episode A', duration: 278634, watched: false }],
        arc2: [{ title: 'Episode 1', duration: 278634, watched: false }],
      },
    });
  });

  it('should add new episodes without modifying existing ones', () => {
    const latest: Serie = {
      saga1: {
        arc1: [{ title: 'Episode B', duration: 278634, watched: false }],
      },
    };

    const existing: Serie = {
      saga1: {
        arc1: [{ title: 'Episode A', duration: 278634, watched: false }],
      },
    };

    const result = mergeJsons(latest, existing);

    expect(result).toEqual({
      saga1: {
        arc1: [
          { title: 'Episode A', duration: 278634, watched: false },
          { title: 'Episode B', duration: 278634, watched: false },
        ],
      },
    });
  });

  it('should not duplicate existing episodes', () => {
    const latest: Serie = {
      saga1: {
        arc1: [{ title: 'Episode A', duration: 278634, watched: false }],
      },
    };

    const existing: Serie = {
      saga1: {
        arc1: [{ title: 'Episode A', duration: 278634, watched: false }],
      },
    };

    const result = mergeJsons(latest, existing);

    expect(result).toEqual(existing);
  });

  it('should correctly handle multiple sagas and arcs', () => {
    const latest: Serie = {
      saga1: {
        arc1: [{ title: 'Episode 1', duration: 278634, watched: false }],
      },
      saga2: {
        arc1: [{ title: 'Episode X', duration: 278634, watched: false }],
      },
    };

    const existing: Serie = {
      saga1: {
        arc1: [{ title: 'Episode A', duration: 278634, watched: false }],
        arc2: [{ title: 'Episode B', duration: 278634, watched: false }],
      },
    };

    const result = mergeJsons(latest, existing);

    expect(result).toEqual({
      saga1: {
        arc1: [
          { title: 'Episode A', duration: 278634, watched: false },
          { title: 'Episode 1', duration: 278634, watched: false },
        ],
        arc2: [{ title: 'Episode B', duration: 278634, watched: false }],
      },
      saga2: {
        arc1: [{ title: 'Episode X', duration: 278634, watched: false }],
      },
    });
  });
});
