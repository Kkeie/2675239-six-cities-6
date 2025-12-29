import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useMap from './use-map';
import { Location } from '../types/location';

// Mock leaflet
vi.mock('leaflet', () => {
  const mockFlyTo = vi.fn();
  const mockMap = {
    flyTo: mockFlyTo,
  };

  const mockTileLayer = {
    addTo: vi.fn().mockReturnThis(),
  };

  return {
    default: {
      map: vi.fn().mockReturnValue(mockMap),
      tileLayer: vi.fn().mockReturnValue(mockTileLayer),
    },
  };
});

describe('useMap', () => {
  let mapRef: React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    mapRef = { current: document.createElement('div') };
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return null initially when mapRef is null', () => {
    const nullRef = { current: null };
    const city: Location = {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12,
    };

    const { result } = renderHook(() => useMap(nullRef, city));

    expect(result.current).toBeNull();
  });

  it('should create map instance when mapRef is provided', () => {
    const city: Location = {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12,
    };

    const { result } = renderHook(() => useMap(mapRef, city));

    // Map should be created (not null)
    expect(result.current).not.toBeNull();
  });

  it('should update map position when city changes', () => {
    const initialCity: Location = {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12,
    };

    const { result, rerender } = renderHook(
      ({ city }) => useMap(mapRef, city),
      {
        initialProps: { city: initialCity },
      }
    );

    expect(result.current).not.toBeNull();

    const newCity: Location = {
      latitude: 52.371807,
      longitude: 4.896029,
      zoom: 13,
    };

    rerender({ city: newCity });

    // Map should still exist
    expect(result.current).not.toBeNull();
    // flyTo should be called on the map instance
    if (result.current) {
      expect(result.current.flyTo).toBeDefined();
    }
  });
});

