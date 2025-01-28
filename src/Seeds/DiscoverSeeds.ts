const meditationTypes = [
  {
    id: "1",
    title: "Focus",
    sessions: 26,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/da1c/bc93/0dd05609e70cbe28888b402c248b49f5?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qgh8kAOGqITy39YGFnwT4KoW4pfRxVKMimru8fDzCXX7iFvCtwZlWnwT8tHvBhelbhWC0kbkEfU9EauJHzb4PHLn48iGSMKr56KQe91Umzvfeg4WJonyVFJHAiiqzaxZExH7~VKzZFkvipRJSwAeZjho1qeFfeQ97vb-NpTto95PgJCW~0spIP~G08UIfaoFbzX3F35N-pUFkbhSb7fT~ri1kM86nhdQiJU1SwFaqH~zud-VuTVFdiBi4a6RTRiVTHihKF0zcvdHPc-wxOnWfXfilhs~WMO3PvixbLDgQz9Hdt8det5u6T44sm6n15GJYnws5Y72U2qeRGBicz-lwA__", // Replace with actual image URLs
  },
  {
    id: "2",
    title: "Sleep",
    sessions: 12,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/6446/df36/dbe74bc35c40fe7e774d6fde81bc03fd?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cBa904C7ceeShDZVq0C7~RnUnlq8yarYD~auR1dTj6n7XGKNq8cbaSJm79aOx3TAy-r6b53X~0qMTMrGcTmeh-iTRPOjjKHlld8h2d89~3HdioTiCJJgtnklpmIril2OdrtGk1EyfsC8qgwUBo5eygDqw27lkKimVfSt3d57TAIwgzWEpgfxeXLF4pStn82M9G4PxyrRx5upYZfpV4TWI5K-vmOjahdJDcgEguXCfGzkRwkMKMH7uk6xbP6FBDU8xTl3pBJuo3mObRCf4vZRHlXRa9EymYkISYeTxI0-Op576sGldN1OCXP8MZEN9LJm02ZBcbK0LeXdL~j0vHXEwA__", // Replace with actual image URLs
  },
  {
    id: "3",
    title: "Relaxation",
    sessions: 12,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/a4a0/2628/cabd302ddee9cc5565d23c4c13f71025?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Au~eVSsLWRALf3h90BUuA-omOYOwLSip-CIgk8WmzeXMJGkQcUPjtA-6EH4z4iPrKyeZVNJ9VWtGky4Bacsf4i-7~a3WzaPIzgBedgUmbD7jCxU2dJG4LytdSDiqaqlLSGSW1sxHfygsTLlq3czuW4XJKYbFpswyS6MSOSBMrKkeuW6gYSm5MgGGR4plMNPo8kyWITaUk9d3x-mYyGifcN2UtpnKtXoqk947dmXFctLh3P53ChTnkDa4ubSXsAdH~AxHebS317skrOvCmDXD1YSKhAQaj3VP-LkViHp8w505tPUldbJ~-zbtIA9nOUMV2xyKbYvSdvUrUG~P5yL~9g__", // Replace with actual image URLs
  },
  {
    id: "4",
    title: "Music",
    sessions: 65,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/4578/1da8/130b713a4dfb93b876f1e47933c17a9a?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MT13Ce-lLwlh01xyVIf2rb~mWCXphuudZcJ-XZofMC6flKOFhHru5EPAIQX3lkda9NRXoYADMVZLJLtBNUK8WmxrJgtDNH-Vsuij1n9k2CGi8iPb~StIP5h4wey04UqVIqsafKsNIQVDoAO1Vi83n2OylcP~o8NNBExnizaQ2Jm5a11yVppW79SIvqJivDUkTdbpnMQ9ns47cMlh8w2VMVOQu8gfOB5vzGrUQKCzZuWBPtc2zOUvLqfNFhqC4CfE3A--6oWPh9zGz7NgwgpuFx0qr~OQ6H7RFZB0KtNiSKsdy~zBHEg8HgDIoUf-ImyE-D5SKkPXkz2ye-fbf3dp1w__", // Replace with actual image URLs
  },
  {
    id: "5",
    title: "Wisdom",
    sessions: 11,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/da1c/bc93/0dd05609e70cbe28888b402c248b49f5?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qgh8kAOGqITy39YGFnwT4KoW4pfRxVKMimru8fDzCXX7iFvCtwZlWnwT8tHvBhelbhWC0kbkEfU9EauJHzb4PHLn48iGSMKr56KQe91Umzvfeg4WJonyVFJHAiiqzaxZExH7~VKzZFkvipRJSwAeZjho1qeFfeQ97vb-NpTto95PgJCW~0spIP~G08UIfaoFbzX3F35N-pUFkbhSb7fT~ri1kM86nhdQiJU1SwFaqH~zud-VuTVFdiBi4a6RTRiVTHihKF0zcvdHPc-wxOnWfXfilhs~WMO3PvixbLDgQz9Hdt8det5u6T44sm6n15GJYnws5Y72U2qeRGBicz-lwA__", // Replace with actual image URLs
  },
  {
    id: "6",
    title: "Lo Fi",
    sessions: 32,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/4578/1da8/130b713a4dfb93b876f1e47933c17a9a?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MT13Ce-lLwlh01xyVIf2rb~mWCXphuudZcJ-XZofMC6flKOFhHru5EPAIQX3lkda9NRXoYADMVZLJLtBNUK8WmxrJgtDNH-Vsuij1n9k2CGi8iPb~StIP5h4wey04UqVIqsafKsNIQVDoAO1Vi83n2OylcP~o8NNBExnizaQ2Jm5a11yVppW79SIvqJivDUkTdbpnMQ9ns47cMlh8w2VMVOQu8gfOB5vzGrUQKCzZuWBPtc2zOUvLqfNFhqC4CfE3A--6oWPh9zGz7NgwgpuFx0qr~OQ6H7RFZB0KtNiSKsdy~zBHEg8HgDIoUf-ImyE-D5SKkPXkz2ye-fbf3dp1w__", // Replace with actual image URLs
  },
  {
    id: "7",
    title: "Nature",
    sessions: 52,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/a4a0/2628/cabd302ddee9cc5565d23c4c13f71025?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Au~eVSsLWRALf3h90BUuA-omOYOwLSip-CIgk8WmzeXMJGkQcUPjtA-6EH4z4iPrKyeZVNJ9VWtGky4Bacsf4i-7~a3WzaPIzgBedgUmbD7jCxU2dJG4LytdSDiqaqlLSGSW1sxHfygsTLlq3czuW4XJKYbFpswyS6MSOSBMrKkeuW6gYSm5MgGGR4plMNPo8kyWITaUk9d3x-mYyGifcN2UtpnKtXoqk947dmXFctLh3P53ChTnkDa4ubSXsAdH~AxHebS317skrOvCmDXD1YSKhAQaj3VP-LkViHp8w505tPUldbJ~-zbtIA9nOUMV2xyKbYvSdvUrUG~P5yL~9g__", // Replace with actual image URLs
  },
  {
    id: "8",
    title: "Binaural",
    sessions: 18,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/6446/df36/dbe74bc35c40fe7e774d6fde81bc03fd?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cBa904C7ceeShDZVq0C7~RnUnlq8yarYD~auR1dTj6n7XGKNq8cbaSJm79aOx3TAy-r6b53X~0qMTMrGcTmeh-iTRPOjjKHlld8h2d89~3HdioTiCJJgtnklpmIril2OdrtGk1EyfsC8qgwUBo5eygDqw27lkKimVfSt3d57TAIwgzWEpgfxeXLF4pStn82M9G4PxyrRx5upYZfpV4TWI5K-vmOjahdJDcgEguXCfGzkRwkMKMH7uk6xbP6FBDU8xTl3pBJuo3mObRCf4vZRHlXRa9EymYkISYeTxI0-Op576sGldN1OCXP8MZEN9LJm02ZBcbK0LeXdL~j0vHXEwA__", // Replace with actual image URLs
  },
  {
    id: "9",
    title: "Sunset",
    sessions: 21,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/da1c/bc93/0dd05609e70cbe28888b402c248b49f5?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qgh8kAOGqITy39YGFnwT4KoW4pfRxVKMimru8fDzCXX7iFvCtwZlWnwT8tHvBhelbhWC0kbkEfU9EauJHzb4PHLn48iGSMKr56KQe91Umzvfeg4WJonyVFJHAiiqzaxZExH7~VKzZFkvipRJSwAeZjho1qeFfeQ97vb-NpTto95PgJCW~0spIP~G08UIfaoFbzX3F35N-pUFkbhSb7fT~ri1kM86nhdQiJU1SwFaqH~zud-VuTVFdiBi4a6RTRiVTHihKF0zcvdHPc-wxOnWfXfilhs~WMO3PvixbLDgQz9Hdt8det5u6T44sm6n15GJYnws5Y72U2qeRGBicz-lwA__", // Replace with actual image URLs
  },
  {
    id: "10",
    title: "Jazz",
    sessions: 19,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/a4a0/2628/cabd302ddee9cc5565d23c4c13f71025?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Au~eVSsLWRALf3h90BUuA-omOYOwLSip-CIgk8WmzeXMJGkQcUPjtA-6EH4z4iPrKyeZVNJ9VWtGky4Bacsf4i-7~a3WzaPIzgBedgUmbD7jCxU2dJG4LytdSDiqaqlLSGSW1sxHfygsTLlq3czuW4XJKYbFpswyS6MSOSBMrKkeuW6gYSm5MgGGR4plMNPo8kyWITaUk9d3x-mYyGifcN2UtpnKtXoqk947dmXFctLh3P53ChTnkDa4ubSXsAdH~AxHebS317skrOvCmDXD1YSKhAQaj3VP-LkViHp8w505tPUldbJ~-zbtIA9nOUMV2xyKbYvSdvUrUG~P5yL~9g__", // Replace with actual image URLs
  },
  {
    id: "11",
    title: "Jazz",
    sessions: 19,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/a4a0/2628/cabd302ddee9cc5565d23c4c13f71025?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Au~eVSsLWRALf3h90BUuA-omOYOwLSip-CIgk8WmzeXMJGkQcUPjtA-6EH4z4iPrKyeZVNJ9VWtGky4Bacsf4i-7~a3WzaPIzgBedgUmbD7jCxU2dJG4LytdSDiqaqlLSGSW1sxHfygsTLlq3czuW4XJKYbFpswyS6MSOSBMrKkeuW6gYSm5MgGGR4plMNPo8kyWITaUk9d3x-mYyGifcN2UtpnKtXoqk947dmXFctLh3P53ChTnkDa4ubSXsAdH~AxHebS317skrOvCmDXD1YSKhAQaj3VP-LkViHp8w505tPUldbJ~-zbtIA9nOUMV2xyKbYvSdvUrUG~P5yL~9g__", // Replace with actual image URLs
  },
  {
    id: "12",
    title: "Jazz",
    sessions: 19,
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/a4a0/2628/cabd302ddee9cc5565d23c4c13f71025?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Au~eVSsLWRALf3h90BUuA-omOYOwLSip-CIgk8WmzeXMJGkQcUPjtA-6EH4z4iPrKyeZVNJ9VWtGky4Bacsf4i-7~a3WzaPIzgBedgUmbD7jCxU2dJG4LytdSDiqaqlLSGSW1sxHfygsTLlq3czuW4XJKYbFpswyS6MSOSBMrKkeuW6gYSm5MgGGR4plMNPo8kyWITaUk9d3x-mYyGifcN2UtpnKtXoqk947dmXFctLh3P53ChTnkDa4ubSXsAdH~AxHebS317skrOvCmDXD1YSKhAQaj3VP-LkViHp8w505tPUldbJ~-zbtIA9nOUMV2xyKbYvSdvUrUG~P5yL~9g__", // Replace with actual image URLs
  },
];

export default meditationTypes;
