import { http } from 'msw';
import { User, Comment, Playlist, Track } from '../types';

const users: User[] = [
  {
    id: 1,
    name: 'turntable_official',
    profileImage: '',
  },
  {
    id: 2,
    name: 'l4o5z6',
    profileImage: '',
  },
  {
    id: 3,
    name: 'onegqueen',
    profileImage: '',
  },
];

const comments: Comment[] = [
  {
    id: 1,
    user: users[0],
    content: '검정치마의 노래가 듣고 싶은 날이네요 :)',
    uploadTime: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
    track: {
      id: '1',
      artists: ['검정치마'],
      title: '그늘은 그림자로',
      duration: '04:47',
      albumImgUrl:
        'https://musicmeta-phinf.pstatic.net/album/002/840/2840793.jpg?type=r360Fll&v=20230608184200',
    },
  },
  {
    id: 2,
    user: users[1],
    content: '주인장 감성 미쳤다',
    uploadTime: new Date(new Date().getTime() - 5 * 60 * 1000),
  },
  {
    id: 3,
    user: users[2],
    content: '검정치마 노래 좋아하세요?',
    uploadTime: new Date(),
  },
];

const playlists: Playlist[] = [
  {
    id: 1,
    title: 'Playlist 1',
    description: 'This is the description for playlist 1.',
    duration: '08:55',
    thumbnailImgUrl:
      'https://musicmeta-phinf.pstatic.net/album/002/014/2014761.jpg?type=r360Fll&v=20230608184159',
    madeBy: 'turntable_official',
    liked: false,
    tracks: [
      {
        id: '2',
        artists: ['검정치마'],
        title: '나랑 아니면',
        duration: '04:31',
        albumImgUrl:
          'https://musicmeta-phinf.pstatic.net/album/002/014/2014761.jpg?type=r360Fll&v=20230608184159',
      },
      {
        id: '3',
        artists: ['실리카겔'],
        title: 'Realize',
        duration: '04:24',
        albumImgUrl:
          'https://musicmeta-phinf.pstatic.net/album/030/560/30560050.jpg?type=r360Fll&v=20240227163508',
      },
    ],
  },
  {
    id: 2,
    title: 'Playlist 2',
    description: 'This is the description for playlist 2.',
    duration: '08:26',
    thumbnailImgUrl:
      'https://musicmeta-phinf.pstatic.net/album/002/005/2005984.jpg?type=r360Fll&v=20230331144254',
    madeBy: 'turntable_official',
    liked: false,
    tracks: [
      {
        id: '4',
        artists: ['ADOY'],
        title: `Runner's High`,
        duration: '04:32',
        albumImgUrl:
          'https://musicmeta-phinf.pstatic.net/album/002/005/2005984.jpg?type=r360Fll&v=20230331144254',
      },
      {
        id: '5',
        artists: ['카더가든'],
        title: '나무',
        duration: '03:54',
        albumImgUrl:
          'https://musicmeta-phinf.pstatic.net/album/003/011/3011240.jpg?type=r360Fll&v=20230331152348',
      },
    ],
  },
];

const handlers = [
  // 1. 사용자 이름 조회 API
  http.get('/api/username', ({ request }) => {
    const url = new URL(request.url);
    const memberId = url.searchParams.get('memberId');

    const foundUser = users.find(
      (user) => user.id === parseInt(memberId || '0', 10),
    );
    if (foundUser) {
      return new Response(JSON.stringify({ memberName: foundUser.name }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
    });
  }),

  // 2. 최신 댓글 조회 API
  http.get('/api/comment/latest', ({ request }) => {
    const url = new URL(request.url);
    const memberId = url.searchParams.get('memberId');
    const foundComment = comments.find(
      (comment) => comment.id === parseInt(memberId || '0', 10),
    );

    if (foundComment) {
      return new Response(JSON.stringify(foundComment), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Comment not found' }), {
      status: 404,
    });
  }),

  // 3. 댓글 등록 API
  http.post('/api/comment/guest', async ({ request }) => {
    const newComment = (await request.json()) as Comment;
    comments.push(newComment);

    return new Response(null, { status: 200 });
  }),

  // 4. 댓글 목록 조회 API
  http.get('/api/comments/guest', () => {
    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  // 5. 음악 검색 API
  http.get('/api/search/track', () => {
    const tracks: Track[] = [
      {
        id: '6',
        artists: ['리도어'],
        title: '사랑의 미학',
        duration: '04:16',
        albumImgUrl:
          'https://musicmeta-phinf.pstatic.net/album/008/552/8552698.jpg?type=r360Fll&v=20230331083142',
      },
    ];

    return new Response(JSON.stringify(tracks), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  // 6. 플레이리스트 생성 API
  http.post('/api/playlists/create', async ({ request }) => {
    const newPlaylist = (await request.json()) as Playlist;
    playlists.push(newPlaylist);

    return new Response(null, { status: 200 });
  }),

  // 7. 플레이리스트 로드 API
  http.get('/api/playlists/:pageOwnerId', ({ params }) => {
    const { pageOwnerId } = params;
    const userPlaylists = playlists.filter(
      (playlist) => playlist.madeBy === pageOwnerId,
    );

    return new Response(JSON.stringify(userPlaylists), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  // 8. 플레이리스트 상세 조회 API
  http.get('/api/playlists/detail', ({ request }) => {
    const url = new URL(request.url);
    const playListId = url.searchParams.get('playListId');

    const playlist = playlists.find(
      (pl) => pl.id === parseInt(playListId || '0', 10),
    );

    if (playlist) {
      return new Response(JSON.stringify({ songs: playlist.tracks }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Playlist not found' }), {
      status: 404,
    });
  }),

  // 9. YouTube URL 조회 API
  http.post('/api/song/youtube-url', async ({ request }) => {
    const { songId } = (await request.json()) as {
      songId: number;
    };

    const youtubeIdMap: { [key: number]: string } = {
      1: 'VW3pnfyyZf4',
      2: 'MemcTxtNv9Q',
      3: '0CZJZDPyAZY',
      4: '6z3yJ4d4RmA',
      5: 'aM2OzkMRPb0',
      6: 'AdThTn2iBCs',
    };

    const youtubeId = youtubeIdMap[songId];

    if (youtubeId) {
      return new Response(JSON.stringify({ youtubeId }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: 'Invalid songId' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
];

export default handlers;
